FROM node:10.15 AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN yarn
COPY . ./
RUN yarn build

FROM python:3.7
WORKDIR /app/api
ENV VIRTUAL_ENV=/app/api/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY api/requirements.txt .
RUN pip install -r requirements.txt 

COPY --from=build app/build /app/build
COPY /api .

EXPOSE 5000
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
CMD [ "python", "app.py" ]
