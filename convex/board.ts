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
    "/placeholder/11.svg",
    "/placeholder/12.svg",
    "/placeholder/13.svg",
    "/placeholder/14.svg",
    "/placeholder/15.svg",
    "/placeholder/16.svg",
    "/placeholder/17.svg",
    "/placeholder/18.svg",
    "/placeholder/19.svg",
    "/placeholder/20.svg",
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

export const remove = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        // TODO: Delete fav

        await ctx.db.delete(args.id)
    }
})

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const title = args.title.trim()
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        if (!title) {
            throw new Error("Title is required")
        }

        if (title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters")
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title
        })

        return board
    }
})