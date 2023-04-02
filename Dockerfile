# Stage 1
FROM node:16.14.2 as node
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/swift-tool /usr/share/nginx/html

# docker build -t swift-tools .
# docker run -d -p 80:80 swift-tools
