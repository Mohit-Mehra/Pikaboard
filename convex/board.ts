import { mutation } from "./_generated/server"
import { v } from "convex/values"

const images = [
    "/placeholder/1.svg",
    "/placeholder/2.svg",
    "/placeholder/3.svg",
    "/placeholder/4.svg",
    "/placeholder/5.svg",
    "/placeholder/6.svg",
    "/placeholder/7.svg",
    "/placeholder/8.svg",
    "/placeholder/9.svg",
    "/placeholder/10.svg",
]

export const create = mutation(
    {
        args: {
            orgId: v.string(),
            title: v.string(),
        },
        handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity()

            if (!identity) {
                throw new Error("Unauthorized")
            }

            const randomIamge = images[Math.floor(Math.random() * images.length)]

            const baoard = await ctx.db.insert("boards", {
                title: args.title,
                orgId: args.orgId,
                authId: identity.subject,
                authorName: identity.name!,
                imageUrl: randomIamge
            })
            return baoard;
        }
    }
)