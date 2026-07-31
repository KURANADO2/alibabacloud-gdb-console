FROM node:22-bookworm-slim
RUN mkdir /gdb-console
ADD gdb-console.tar /gdb-console
WORKDIR /gdb-console
RUN npm ci --omit=dev --prefix backend
ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["node", "backend/bin/www"]
