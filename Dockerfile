# Étape 1 : Utiliser une image Node.js pour construire l'application
# Étape 1 : build avec Node
FROM node:20 AS build
WORKDIR /app

# Copier uniquement les fichiers de dépendances pour utiliser le cache Docker efficacement
COPY package*.json ./
RUN npm ci

# Copier le reste du projet et builder
COPY . .
RUN npm run build --production

# Étape 2 : servir avec Nginx
FROM nginx:latest
COPY --from=build /app/dist/medieval_trade/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
