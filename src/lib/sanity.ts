import imageUrlBuilder  from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client =createClient({
    projectId:"klqxodq0",
    dataset:"production",
    apiVersion:"2022-03-25",
    useCdn:true,
})

const builder= imageUrlBuilder(client);

export const urlFor=(source:any)=>builder.image(source)
