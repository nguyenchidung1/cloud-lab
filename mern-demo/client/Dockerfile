FROM node:20-alpine AS build
WORKDIR /app

COPY mern-demo/client/package*.json ./
RUN npm install --no-audit --no-fund

COPY mern-demo/client/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]