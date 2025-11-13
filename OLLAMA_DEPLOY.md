# Ollama Production Deployment Guide

This guide covers deploying Ollama with the Mistral model for production use with the Tea Effects API.

## Deployment Options

### Option 1: Self-Hosted Server (Recommended for Cost)

**Requirements:**
- Ubuntu 22.04+ or compatible Linux server
- Minimum 8GB RAM (16GB recommended for Mistral)
- 20GB+ storage for models
- NVIDIA GPU (optional but highly recommended for performance)

**Steps:**

1. **Install Ollama on your server:**
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

2. **Pull the Mistral model:**
   ```bash
   ollama pull mistral
   ```

3. **Configure Ollama to accept external connections:**
   ```bash
   # Edit systemd service
   sudo systemctl edit ollama

   # Add these lines:
   [Service]
   Environment="OLLAMA_HOST=0.0.0.0:11434"

   # Restart service
   sudo systemctl restart ollama
   ```

4. **Set up firewall (allow only your API server):**
   ```bash
   # If using ufw
   sudo ufw allow from <YOUR_API_SERVER_IP> to any port 11434
   sudo ufw enable
   ```

5. **Update your API .env:**
   ```env
   OLLAMA_URL=http://your-server-ip:11434
   OLLAMA_MODEL=mistral
   ```

6. **Test the connection:**
   ```bash
   curl http://your-server-ip:11434/api/generate -d '{
     "model": "mistral",
     "prompt": "What is oolong tea?",
     "stream": false
   }'
   ```

**Estimated Cost:**
- VPS with 16GB RAM: ~$40-80/month (DigitalOcean, Linode, Vultr)
- OR dedicated server: ~$100-200/month

**Pros:**
- Full control over the model
- No per-request costs
- Data privacy
- Can use any Ollama model

**Cons:**
- Requires server management
- Fixed monthly cost regardless of usage
- Need to handle scaling yourself

---

### Option 2: Railway Deployment with Ollama

**Note:** Railway doesn't officially support GPU workloads, so Ollama will run on CPU, which is slower but functional.

**Steps:**

1. **Create a new Railway service for Ollama:**
   ```bash
   railway login
   railway init
   ```

2. **Create a `Dockerfile.ollama`:**
   ```dockerfile
   FROM ollama/ollama:latest

   # Pull the Mistral model during build
   RUN ollama serve & \
       sleep 5 && \
       ollama pull mistral && \
       pkill ollama

   # Expose port
   EXPOSE 11434

   # Run Ollama
   CMD ["ollama", "serve"]
   ```

3. **Deploy to Railway:**
   ```bash
   railway up --dockerfile Dockerfile.ollama
   ```

4. **Get the service URL from Railway dashboard**

5. **Update API environment variables:**
   ```env
   OLLAMA_URL=https://your-ollama-service.railway.app
   OLLAMA_MODEL=mistral
   ```

**Estimated Cost:**
- ~$20-50/month depending on usage
- No GPU, slower inference times

**Pros:**
- Easy deployment
- Managed infrastructure
- Automatic SSL

**Cons:**
- CPU-only (slower)
- Limited resources
- May timeout on complex requests

---

### Option 3: Replicate.com (Easiest, Pay-per-use)

**Note:** This requires switching from Ollama to Replicate's API, but it's the simplest production option.

**Steps:**

1. **Sign up at [replicate.com](https://replicate.com)**

2. **Get your API token from the dashboard**

3. **Install Replicate SDK in the API:**
   ```bash
   cd packages/api
   npm install replicate
   ```

4. **Update environment variables:**
   ```env
   REPLICATE_API_TOKEN=your_token_here
   OLLAMA_MODEL=mistral  # Keep for compatibility
   ```

5. **Modify the AI client** to use Replicate as a fallback

**Estimated Cost:**
- Pay per request: ~$0.001-0.01 per request
- First 100 requests free monthly
- Scales automatically

**Pros:**
- No infrastructure management
- Pay only for usage
- Fast GPU inference
- Automatic scaling

**Cons:**
- Per-request costs can add up
- Less control
- External dependency

---

### Option 4: Modal.com (Serverless GPU)

**Best for:** Serverless GPU inference with auto-scaling

**Steps:**

1. **Sign up at [modal.com](https://modal.com)**

2. **Install Modal:**
   ```bash
   pip install modal
   ```

3. **Create `ollama_modal.py`:**
   ```python
   import modal

   stub = modal.Stub("tea-effects-ollama")

   ollama_image = modal.Image.from_registry(
       "ollama/ollama:latest",
       add_python="3.11"
   ).run_commands("ollama pull mistral")

   @stub.function(
       image=ollama_image,
       gpu="T4",  # Or "A10G" for better performance
       concurrency_limit=10,
   )
   def generate(prompt: str):
       import subprocess
       import json

       result = subprocess.run(
           ["ollama", "run", "mistral", prompt],
           capture_output=True,
           text=True
       )
       return result.stdout

   @stub.webhook(method="POST")
   def api(data: dict):
       prompt = data.get("prompt", "")
       return {"response": generate.remote(prompt)}
   ```

4. **Deploy:**
   ```bash
   modal deploy ollama_modal.py
   ```

5. **Update API to use Modal webhook URL**

**Estimated Cost:**
- ~$0.01-0.05 per minute of GPU time
- Free tier available

**Pros:**
- Serverless scaling
- GPU acceleration
- Pay per use
- Easy deployment

**Cons:**
- Cold starts
- Requires Python wrapper
- External service dependency

---

## Current Setup (Development)

You're currently using:
```env
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=mistral
```

This works for development but won't work in production unless Ollama is running on the same server as your API.

## Recommended Production Strategy

**For Tea Effects App:**

Since this is a PWA with potentially moderate usage:

1. **Start with Option 1 (Self-Hosted)** if you:
   - Expect consistent traffic
   - Want maximum control and privacy
   - Have technical expertise for server management
   - Budget allows $50-100/month

2. **Use Option 3 (Replicate)** if you:
   - Want the easiest setup
   - Expect low to moderate usage
   - Prefer pay-as-you-go pricing
   - Don't want to manage infrastructure

3. **Consider Option 4 (Modal)** if you:
   - Need GPU performance
   - Have variable/spiky traffic
   - Want serverless benefits
   - Are comfortable with Python

## Next Steps

1. Choose your deployment option
2. Follow the corresponding guide above
3. Update your API's `.env` file with the new OLLAMA_URL
4. Test the connection from your Railway API
5. Monitor performance and costs
6. Adjust as needed based on actual usage

## Testing Your Ollama Deployment

Once deployed, test with:

```bash
curl -X POST https://your-api.railway.app/api/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "desired_effects": ["focus", "calm"],
    "preferred_types": ["oolong"]
  }'
```

The API should respond with tea recommendations powered by your Ollama/Mistral deployment.
