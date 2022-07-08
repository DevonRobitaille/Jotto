export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://jotto.vercel.app`
    : 'http://localhost:3000'

export const url = `${baseUrl}/api/trpc`