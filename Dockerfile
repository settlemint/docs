FROM node:24.8.0-alpine3.21

LABEL org.opencontainers.image.source="https://github.com/settlemint/docs"

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --chmod=0777  .next/standalone ./
COPY --chmod=0777  public ./public
COPY --chmod=0777  .next/static ./.next/static

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

CMD ["node", "server.js"]