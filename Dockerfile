# Imagem base do Node na versão 20 (ou LTS atual)
FROM node:20

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos do projeto para o container
COPY . .

# Instalar as dependências
RUN npm install

# Expor a porta padrão do Vite
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
