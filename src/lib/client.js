import { createClient } from "@sanity/client";
import ImageUrlBuilder  from "@sanity/image-url"

export const client = createClient ({
    projectId: "f43irfmf",
    dataset: "production",
    apiVersion: "2024-06-29",
    useCdn: true,
    token: process.env. NEXT_SANITY_TOKEN
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)