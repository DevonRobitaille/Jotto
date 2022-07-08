export const baseUrl = process.env.URL
    ? `https://${process.env.URL}`
    : 'http://localhost:3000'

export const url = `${baseUrl}/api/trpc`