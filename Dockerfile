FROM cgr.dev/chainguard/nginx
LABEL org.opencontainers.image.source="https://github.com/settlemint/btp-docs"

WORKDIR /usr/share/nginx/html/documentation
COPY --chmod=0777 ./build/ /usr/share/nginx/html/documentation
COPY --chmod=0777 ./nginx.conf /etc/nginx/nginx.conf
COPY --chmod=0777 ./nginx.default.conf /etc/nginx/conf.d/default.conf
HEALTHCHECK NONE
USER 1001
