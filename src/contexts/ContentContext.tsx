"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { DEFAULTS, DEFAULT_PORTFOLIO, DEFAULT_SERVICES, DEFAULT_TESTIMONIALS } from "@/lib/defaults";
import type { PortfolioProject, ServiceItem, TestimonialItem } from "@/lib/types";
import { useAuth } from "./AuthContext";

interface ContentContextType {
  // Key-value content
  get: (key: string, fallback?: string) => string;
  update: (key: string, value: string) => Promise<void>;

  // Portfolio
  portfolioProjects: PortfolioProject[];
  updatePortfolioProject: (
    id: string,
    data: Partial<PortfolioProject>
  ) => Promise<void>;
  addPortfolioProject: (
    data: Omit<PortfolioProject, "id" | "created_at" | "updated_at">
  ) => Promise<PortfolioProject | null>;
  deletePortfolioProject: (id: string) => Promise<void>;

  // Services
  services: ServiceItem[];
  updateService: (id: string, data: Partial<ServiceItem>) => Promise<void>;
  addService: (
    data: Omit<ServiceItem, "id" | "created_at" | "updated_at">
  ) => Promise<ServiceItem | null>;
  deleteService: (id: string) => Promise<void>;

  // Testimonials
  testimonials: TestimonialItem[];
  updateTestimonial: (id: string, data: Partial<TestimonialItem>) => Promise<void>;
  addTestimonial: (
    data: Omit<TestimonialItem, "id" | "created_at" | "updated_at">
  ) => Promise<TestimonialItem | null>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Image upload
  uploadImage: (file: File) => Promise<string | null>;

  // State
  loaded: boolean;
}

const ContentContext = createContext<ContentContextType>({
  get: (key, fallback) => fallback || DEFAULTS[key] || "",
  update: async () => {},
  portfolioProjects: [],
  updatePortfolioProject: async () => {},
  addPortfolioProject: async () => null,
  deletePortfolioProject: async () => {},
  services: [],
  updateService: async () => {},
  addService: async () => null,
  deleteService: async () => {},
  testimonials: [],
  updateTestimonial: async () => {},
  addTestimonial: async () => null,
  deleteTestimonial: async () => {},
  uploadImage: async () => null,
  loaded: false,
});

export function useContent() {
  return useContext(ContentContext);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  const [content, setContent] = useState<Record<string, string>>({});
  const [portfolioProjects, setPortfolioProjects] = useState<
    PortfolioProject[]
  >([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [seeded, setSeeded] = useState(false);

  // Fetch all content on mount
  useEffect(() => {
    const fetchAll = async () => {
      if (!isSupabaseConfigured()) {
        setLoaded(true);
        return;
      }

      try {
        const [contentRes, portfolioRes, servicesRes, testimonialsRes] = await Promise.all([
          supabase.from("site_content").select("*"),
          supabase
            .from("portfolio_projects")
            .select("*")
            .order("sort_order", { ascending: true }),
          supabase
            .from("services")
            .select("*")
            .order("sort_order", { ascending: true }),
          supabase
            .from("testimonials")
            .select("*")
            .order("sort_order", { ascending: true }),
        ]);

        if (contentRes.data) {
          const map: Record<string, string> = {};
          for (const row of contentRes.data) {
            map[row.key] = row.value;
          }
          setContent(map);
        }

        if (portfolioRes.data && portfolioRes.data.length > 0) {
          setPortfolioProjects(portfolioRes.data);
        }

        if (servicesRes.data && servicesRes.data.length > 0) {
          setServices(servicesRes.data);
        }

        if (testimonialsRes.data && testimonialsRes.data.length > 0) {
          setTestimonials(testimonialsRes.data);
        }
      } catch (_err) {
        // Silently fail — defaults will be used
      }
      setLoaded(true);
    };

    fetchAll();
  }, []);

  // Auto-seed when admin logs in and tables are empty
  useEffect(() => {
    if (!isAdmin || !loaded || seeded || !isSupabaseConfigured()) return;

    const seed = async () => {
      try {
        // Seed portfolio if empty
        if (portfolioProjects.length === 0) {
          const { data } = await supabase
            .from("portfolio_projects")
            .insert(DEFAULT_PORTFOLIO)
            .select();
          if (data) setPortfolioProjects(data);
        }

        // Seed services if empty
        if (services.length === 0) {
          const { data } = await supabase
            .from("services")
            .insert(DEFAULT_SERVICES)
            .select();
          if (data) setServices(data);
        }

        // Seed testimonials if empty
        if (testimonials.length === 0) {
          const { data } = await supabase
            .from("testimonials")
            .insert(DEFAULT_TESTIMONIALS)
            .select();
          if (data) setTestimonials(data);
        }
      } catch (_err) {
        // Silently fail
      }
      setSeeded(true);
    };

    seed();
  }, [isAdmin, loaded, seeded, portfolioProjects.length, services.length, testimonials.length]);

  // Get content value with fallback
  const get = useCallback(
    (key: string, fallback?: string): string => {
      return content[key] || fallback || DEFAULTS[key] || "";
    },
    [content]
  );

  // Update content value
  const update = useCallback(
    async (key: string, value: string) => {
      // Update local state immediately
      setContent((prev) => ({ ...prev, [key]: value }));

      if (!isSupabaseConfigured()) return;

      // Upsert to database
      await supabase.from("site_content").upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );
    },
    []
  );

  // Portfolio CRUD
  const updatePortfolioProject = useCallback(
    async (id: string, data: Partial<PortfolioProject>) => {
      setPortfolioProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
      if (!isSupabaseConfigured()) return;
      await supabase.from("portfolio_projects").update(data).eq("id", id);
    },
    []
  );

  const addPortfolioProject = useCallback(
    async (
      data: Omit<PortfolioProject, "id" | "created_at" | "updated_at">
    ) => {
      if (!isSupabaseConfigured()) return null;
      const { data: inserted } = await supabase
        .from("portfolio_projects")
        .insert(data)
        .select()
        .single();
      if (inserted) {
        setPortfolioProjects((prev) => [...prev, inserted]);
      }
      return inserted;
    },
    []
  );

  const deletePortfolioProject = useCallback(async (id: string) => {
    setPortfolioProjects((prev) => prev.filter((p) => p.id !== id));
    if (!isSupabaseConfigured()) return;
    await supabase.from("portfolio_projects").delete().eq("id", id);
  }, []);

  // Services CRUD
  const updateService = useCallback(
    async (id: string, data: Partial<ServiceItem>) => {
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...data } : s))
      );
      if (!isSupabaseConfigured()) return;
      await supabase.from("services").update(data).eq("id", id);
    },
    []
  );

  const addService = useCallback(
    async (data: Omit<ServiceItem, "id" | "created_at" | "updated_at">) => {
      if (!isSupabaseConfigured()) return null;
      const { data: inserted } = await supabase
        .from("services")
        .insert(data)
        .select()
        .single();
      if (inserted) {
        setServices((prev) => [...prev, inserted]);
      }
      return inserted;
    },
    []
  );

  const deleteService = useCallback(async (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    if (!isSupabaseConfigured()) return;
    await supabase.from("services").delete().eq("id", id);
  }, []);

  // Testimonials CRUD
  const updateTestimonial = useCallback(
    async (id: string, data: Partial<TestimonialItem>) => {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
      if (!isSupabaseConfigured()) return;
      await supabase.from("testimonials").update(data).eq("id", id);
    },
    []
  );

  const addTestimonial = useCallback(
    async (data: Omit<TestimonialItem, "id" | "created_at" | "updated_at">) => {
      if (!isSupabaseConfigured()) return null;
      const { data: inserted } = await supabase
        .from("testimonials")
        .insert(data)
        .select()
        .single();
      if (inserted) {
        setTestimonials((prev) => [...prev, inserted]);
      }
      return inserted;
    },
    []
  );

  const deleteTestimonial = useCallback(async (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    if (!isSupabaseConfigured()) return;
    await supabase.from("testimonials").delete().eq("id", id);
  }, []);

  // Upload image to Supabase Storage
  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    if (!isSupabaseConfigured()) return null;

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(fileName);

    return publicUrl;
  }, []);

  return (
    <ContentContext.Provider
      value={{
        get,
        update,
        portfolioProjects:
          portfolioProjects.length > 0
            ? portfolioProjects
            : (DEFAULT_PORTFOLIO as unknown as PortfolioProject[]),
        updatePortfolioProject,
        addPortfolioProject,
        deletePortfolioProject,
        services:
          services.length > 0
            ? services
            : (DEFAULT_SERVICES as unknown as ServiceItem[]),
        updateService,
        addService,
        deleteService,
        testimonials:
          testimonials.length > 0
            ? testimonials
            : (DEFAULT_TESTIMONIALS as unknown as TestimonialItem[]),
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        uploadImage,
        loaded,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}
