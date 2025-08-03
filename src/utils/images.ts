import { supabase } from "@/lib/supabase";
import { writeFile } from "fs/promises";
import path from "path";

export async function saveImage(file: File): Promise<string | null> {
    const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE=== 'true';

    if(useSupabase) {
        const fileName = `${Date.now()}_${file.name}`;
        const { error } = await supabase.storage
            .from('udemy-blog')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
        });
        
        if (error) {
            console.error('Upload error:', error.message);
            return null;
        }
        
        const { data: publicUrlData } = supabase.storage.from('udemy-blog').getPublicUrl(fileName);
        return publicUrlData.publicUrl;
    } else {
        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = `${Date.now()}_${file.name}`
        const uploadDir = path.join(process.cwd(), 'public/images')
    
        try {
            const filePath = path.join(uploadDir, fileName)
            await writeFile(filePath, buffer);
            return `/images/${fileName}`
        } catch {
            return null
        }
    }
}
