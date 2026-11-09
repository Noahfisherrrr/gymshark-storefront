// Hand-written to match supabase/schema.sql. There is no live-linked Supabase
// project in this environment to run `supabase gen types typescript` against,
// so these mirror the CREATE TABLE statements by hand instead. Keep this file
// in sync with schema.sql when either changes.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          date_of_birth: string | null
          avatar_url: string | null
          phone: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string
          last_name?: string
          date_of_birth?: string | null
          avatar_url?: string | null
          phone?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
        Relationships: []
      }
      products: {
        Row: {
          id: string
          slug: string
          name: string
          subtitle: string | null
          category: string
          gender: string
          type: string
          activities: string[]
          fit: string | null
          fit_note: string | null
          rise: string | null
          features: string[]
          collection: string | null
          collection_name: string | null
          price: number
          compare_at_price: number | null
          image: string
          tag: string | null
          badges: string[]
          color: string | null
          color_hex: string | null
          colorways: Json
          gallery: Json
          description: string
          highlights: string[]
          materials: string | null
          care_instructions: string[]
          fit_feedback: Json
          rating: number
          review_count: number
          rating_breakdown: Json
          complete_the_look_ids: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          slug: string
          name: string
          subtitle?: string | null
          category: string
          gender: string
          type: string
          activities?: string[]
          fit?: string | null
          fit_note?: string | null
          rise?: string | null
          features?: string[]
          collection?: string | null
          collection_name?: string | null
          price: number
          compare_at_price?: number | null
          image: string
          tag?: string | null
          badges?: string[]
          color?: string | null
          color_hex?: string | null
          colorways?: Json
          gallery?: Json
          description?: string
          highlights?: string[]
          materials?: string | null
          care_instructions?: string[]
          fit_feedback?: Json
          rating?: number
          review_count?: number
          rating_breakdown?: Json
          complete_the_look_ids?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['products']['Insert']>
        Relationships: []
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          size: string
          color: string
          sku: string
          stock: number
          price_override: number | null
          created_at: string
        }
        Insert: {
          id: string
          product_id: string
          size: string
          color: string
          sku: string
          stock?: number
          price_override?: number | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['product_variants']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'product_variants_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string | null
          author: string
          verified: boolean
          rating: number
          title: string | null
          content: string
          size_purchased: string | null
          usual_size: string | null
          activity: string | null
          height: string | null
          weight: string | null
          helpful_count: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id?: string | null
          author: string
          verified?: boolean
          rating: number
          title?: string | null
          content: string
          size_purchased?: string | null
          usual_size?: string | null
          activity?: string | null
          height?: string | null
          weight?: string | null
          helpful_count?: number
          status?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'reviews_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      comments: {
        Row: {
          id: string
          parent_type: string
          parent_id: string
          user_id: string | null
          author_name: string
          author_role: string
          content: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          parent_type: string
          parent_id: string
          user_id?: string | null
          author_name: string
          author_role?: string
          content: string
          status?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['comments']['Insert']>
        Relationships: []
      }
      review_helpful_votes: {
        Row: {
          id: string
          review_id: string
          user_id: string | null
          client_ip: string | null
          created_at: string
        }
        Insert: {
          id?: string
          review_id: string
          user_id?: string | null
          client_ip?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['review_helpful_votes']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'review_helpful_votes_review_id_fkey'
            columns: ['review_id']
            isOneToOne: false
            referencedRelation: 'reviews'
            referencedColumns: ['id']
          },
        ]
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          variant_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          variant_id: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['cart_items']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'cart_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'cart_items_variant_id_fkey'
            columns: ['variant_id']
            isOneToOne: false
            referencedRelation: 'product_variants'
            referencedColumns: ['id']
          },
        ]
      }
      wishlist_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['wishlist_items']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'wishlist_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          label: string
          first_name: string
          last_name: string
          line1: string
          line2: string | null
          city: string
          postcode: string
          country: string
          phone: string | null
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          label?: string
          first_name: string
          last_name: string
          line1: string
          line2?: string | null
          city: string
          postcode: string
          country: string
          phone?: string | null
          is_default?: boolean
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['addresses']['Insert']>
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total: number
          subtotal: number
          discount_code: string | null
          discount_amount: number
          status: string
          shipping_address: Json
          payment_method: string
          created_at: string
        }
        Insert: {
          id: string
          user_id: string
          total: number
          subtotal: number
          discount_code?: string | null
          discount_amount?: number
          status?: string
          shipping_address: Json
          payment_method?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          variant_id: string
          name: string
          size: string
          color: string
          unit_price: number
          quantity: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          variant_id: string
          name: string
          size: string
          color: string
          unit_price: number
          quantity: number
        }
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
        ]
      }
      discount_codes: {
        Row: {
          code: string
          description: string | null
          amount_off: number
          is_active: boolean
          expires_at: string | null
        }
        Insert: {
          code: string
          description?: string | null
          amount_off: number
          is_active?: boolean
          expires_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['discount_codes']['Insert']>
        Relationships: []
      }
      content_blocks: {
        Row: {
          key: string
          title: string | null
          content: Json
          updated_at: string
        }
        Insert: {
          key: string
          title?: string | null
          content?: Json
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['content_blocks']['Insert']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      increment_review_helpful: {
        Args: { p_review_id: string }
        Returns: number
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
