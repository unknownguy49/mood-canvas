# Use a Python base image
FROM python:3.12-slim

# Install Rust for building tokenizers and other necessary packages
RUN apt-get update && apt-get install -y rustc cargo build-essential

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port 5000 for Flask app
EXPOSE 5000

# Command to run the application
CMD ["python", "app.py"]
