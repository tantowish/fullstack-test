FROM golang:1.21.0

WORKDIR /app

COPY . .

# Download and install the dependencies
RUN go get -d -v ./...

# Build the go app
RUN go build -o user-auth .

EXPOSE 8000

CMD ["./user-auth"]