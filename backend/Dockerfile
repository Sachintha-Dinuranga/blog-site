FROM node:22

WORKDIR /app

# 1. Copy package files
COPY package*.json ./

# 2. Install dependencies (including devDependencies for tsc and prisma CLI)
RUN npm install --include=dev

# 3. Copy the rest of your source code (including src/prisma)
COPY . .

# 4. Generate Prisma Client BEFORE building TypeScript
RUN npx prisma contract emit 

# 5. Compile TypeScript to dist/
RUN npm run build

# Set port environment variable
ENV PORT=3000

# Expose the port 
EXPOSE 3000

# Run the app (Compose will override this with the migrate command)
CMD [ "npm", "start" ]