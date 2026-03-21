FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
ENV NEXT_PUBLIC_API_URL=http://localhost:5000/api
ENV NEXT_PUBLIC_ML_URL=http://localhost:8000
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
# We just use next start since standalone may not be configured in Next.js 14 default template
COPY --from=builder /app ./ 
EXPOSE 3000
CMD ["npm", "start"]
