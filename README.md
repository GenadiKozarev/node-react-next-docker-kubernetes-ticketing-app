# Ticketing App

eCommerce app using Microservices built with Node, React, Docker and Kubernetes

- Users can list a ticket for an event (e.g. music concert, football match, art festival etc.) for sale
- Other users can purchase that ticket
- Any user can list tickets for sale and purchase tickets
- When a user attempts to purchase a ticket, the ticket is "locked" for 15 minutes. The user has 15 minutes to enter their payment info
- While a ticket is locked, no other user can purchase that ticket. After 15 minutes, that ticket should "unlock"
- Ticket prices can be edited if they are not locked

## Tables
<img width="800" alt="Tables" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/80763404-f992-4b57-be50-fecd73e159d4">

## Services

### Overall
<img width="727" alt="services" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/6cd108ec-4a83-41d7-986b-25b0cfd3148d">

### Auth service
<img width="901" alt="auth" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/ef5b8969-5fa3-4f82-8708-e5e8fd4b7a39">
<img width="1494" alt="auth process" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/6a8b48f4-597f-4074-864c-37915d69bea9">

## Events
<img width="867" alt="events" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/5e6a920e-c2bc-4d64-b3ef-7c998ee8038b">

### Events published by each Service
<img width="985" alt="Events publishes by each Service" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/d764af72-ae33-4d8c-a447-31a18666e428">

### ticket:created
<img width="763" alt="events published by each serviceee" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/cd3e1e96-a599-4c42-84b2-06101069182e">

### ticket:updated
<img width="760" alt="events published by each servicee" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/5808c163-9a31-494b-af6c-8e0b9099b277">

### order:created
<img width="993" alt="events published by each service" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/a504a782-0158-4106-9155-3f0000e7e804">

### order:cancelled
<img width="992" alt="order_cancelled" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/f886d19b-165e-4b53-9c59-4af7ad0681fb">

### Expiration Service
### expiration:complete
<img width="915" alt="expiration-complete" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/e93b5ce9-9336-496c-a30e-577e8013627a">
<img width="641" alt="expiration-complete 2" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/0fd19a48-128c-42a1-b241-c794f9f84768">

## Notes about the overall design of each service
<img width="945" alt="overall-design-of-each-service" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/28d6de4d-d1e0-4980-b61d-563383a0efa5">

### Tickets service
<img width="712" alt="tickets service notes" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/d49cb12b-181a-4e67-8f4f-f6e8d5e5131a">
<img width="739" alt="tickets service" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/eef28b7a-2af5-49d5-9934-a979bccbcf2f">

### Orders service
<img width="973" alt="Orders Service" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/9dff874f-2910-4de3-b431-bb7d487b8847">
<img width="609" alt="Orders Service Setup" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/21d86df8-2569-478f-a07c-1b382fcef7c8">
<img width="835" alt="orders routes" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/c43ca474-9d56-41b9-97c8-ef6fcea3723c">

### Payments service
### payment:created
<img width="485" alt="payment-created" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/ef7b3d70-9872-46c5-8fb2-84c635192bb1">

### Class Listener ([npm package](https://www.npmjs.com/package/@library-of-knowledge/common))
<img width="775" alt="Class Listener" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/1d853ccb-aada-409c-ae02-4fe6cfeb2310">
<img width="757" alt="Class Listener subclasses" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/e18088c3-c68d-4367-8dbb-b81286a2d014">

### NATS Client Singleton
<img width="763" alt="NATS Client Singleton" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/ca774e4d-52a4-4992-9ffe-f7f21d22f214">

### Errors
Common Response Structure
```
{
    errors: {
        message: string, field?: string
    }[]
}
```

#### Notes for tools and package dependencies
- `ts-node-dev` - tool to execute the project in a development environment
- `mongodb-memory-server` - copy of mongodb will be running in-memory in order to test multiple databases at the same time, hence be able to run tests for different services concurrently on the same machine
- NATS Streaming Server - used to share events across all the different services in the app (commandline options ref: https://hub.docker.com/_/nats-streaming)
- DigitalOcean command line interface: https://docs.digitalocean.com/reference/doctl/how-to/install/
  - `doctl auth init -t {{TOKEN_FROM_DIGITAL_OCEAN_API}}` - to authenticate

### how to deploy and start repo
Prerequisites:
- Docker Desktop
- Kubernetes
- Skaffold
- Ingress Nginx
- Digital Ocean account
- Digital Ocean command line interface
- Update the `baseURL` in Client service's build-client file:
  - In api/build-client.js, change the `baseURL` to your purchased domain:
- Disable HTTPS Checking
  - All services are configured to only use cookies when the user is on an HTTPS connection. This will cause auth to fail during the initial deployment of the app. To disable the HTTPS checking, go to the `app.ts file in the `auth`, `orders`, `tickets`, and `payments` services and, at the `cookieSession` middleware, change to the following:
  ```
    cookieSession({
    signed: false,
    secure: false,
  })
  ```
- Add Load Balancer
  - There is currently a bug with `ingress-nginx on DigitalOcean. You can read more about this bug [here](https://github.com/digitalocean/digitalocean-cloud-controller-manager/blob/master/docs/controllers/services/examples/README.md#accessing-pods-over-a-managed-load-balancer-from-inside-the-cluster). To fix it, add the following to the bottom of your `ingress-srv.yaml` manifest. Also, update the URL on this line in the annotations to the domain name you're using: `service.beta.kubernetes.io/do-loadbalancer-hostname: 'www.ticketing-app.fun'`
  ```
  ---
  apiVersion: v1
  kind: Service
  metadata:
    annotations:
      service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol: 'true'
      service.beta.kubernetes.io/do-loadbalancer-hostname: 'www.ticketing-app-prod.xyz'
    labels:
      helm.sh/chart: ingress-nginx-2.0.3
      app.kubernetes.io/name: ingress-nginx
      app.kubernetes.io/instance: ingress-nginx
      app.kubernetes.io/version: 0.32.0
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/component: controller
    name: ingress-nginx-controller
    namespace: ingress-nginx
  spec:
    type: LoadBalancer
    externalTrafficPolicy: Local
    ports:
      - name: http
        port: 80
        protocol: TCP
        targetPort: http
      - name: https
        port: 443
        protocol: TCP
        targetPort: https
    selector:
      app.kubernetes.io/name: ingress-nginx
      app.kubernetes.io/instance: ingress-nginx
      app.kubernetes.io/component: controller
  ```

1. Manually create `jwt-secret` and `stripe-secret`
2. Ensure kubernetes is pointing to the right context (via Docker Desktop's tray icon)
3. Run the following command for deployment, in my case is Digital Ocean
```
// https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/do/deploy.yaml
```


### commands
```
// docker build an image
docker build -t {{IMAGE_TAG_NAME}} .
// push the image to docker hub
docker push {{IMAGE_TAG_NAME}}
```

```
// project start
skaffold dev
```

- how to create kubectl secret for storing JTW information:
```
kubectl create secret generic {{NAME_OF_SECRET}} --from-literal {{KEY}}={{VALUE}}
// example: create a secret and after that try running `skaffold delete` and then `skaffold dev` again.
kubectl create secret generic jwt-secret --from-literal JWT_KEY=asdf
```

- kubectl commands:
```
kubectl get secrets
kubectl get namespace
kubectl get services -n ingress-nginx
kubectl get logs {{POD_NAME}}
kubectl describe pod {{POD_NAME}} // debugging

// open a shell inside a pod
kubectl get pods
kubectl exec -it {{POD_NAME}} sh

// delete a pod
kubectl delete pod {{POD_NAME}}

// how to manually restart a pod: use a pod's name to delete it which will make skaffold start it anew
kubectl get pods
kubectl delete pod {{POD_NAME}}

// kubernetes switch context (commands below or use docker desktop's tray icon)
kubectl config view
kubectl config use-context {{CONTEXT_NAME}}
```

- create TypeScript config file
```
tsc --init
```

- when a new version of our library is available:
```
npm update @library-of-knowledge/common
```

## Frontend notes
### routes
<img width="933" alt="routes" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/dc99fa27-0d8f-4f0c-9138-532081bb9f9d">

### AppComponent (rendering the child components)
<img width="881" alt="appComponent" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/d1469613-f010-4243-bf66-f5cf1d7186a8">

### knows issues
- Issue 1:
```
getting imageID for {{DOCKER_IMAGE}}: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```
  - Fix 1:
```
DOCKER_HOST=unix:///Users/$(whoami)/.docker/run/docker.sock skaffold dev
```

- Issue 2:
```
Error from server (InternalError): error when creating "STDIN": Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": failed to call webhook: Post "https://ingress-nginx-controller-admission.ingress-nginx.svc:443/networking/v1/ingresses?timeout=10s": dial tcp 10.110.162.108:443: connect: connection refused
```
  - Fix 2:
    - run before `skaffold`:
```
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
```

- Issue 3:
When there's a "Connection refused" message in insomnia/postman.
  - Fix 3:
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

- Issue 4:
```
Message:secret “jwt-secret” not found
```
  - Fix 4:
```
kubectl create secret generic jwt-secret --from-literal JWT_KEY=randomkey
```

- Issue 5:
```
- Error creating: Unauthorized
 - deployment/orders-depl: Failed to create Pod for Deployment orders-depl: Error creating: Unauthorized
 - deployment/orders-depl failed. Error: Failed to create Pod for Deployment orders-depl: Error creating: Unauthorized.
```
  - Fix 5:
    - Reset Kubernetes Cluster from Docker Desktop
    - probably would need to create a new `jwt-secret` afterwards
      - kubectl create secret generic jwt-secret --from-literal JWT_KEY=randomkey

- Issue 6:
Skaffold using cached layers when building images may cause a dependency package version discrepancy.
For example, a message like `Module '"@library-of-knowledge/common"' has no exported member 'ExpirationCompleteEvent'.` which is caused from not using the latest version of that module, even after `npm update PACKAGE_NAME`.

  - Fix 6:
    - skaffold.yaml:
    - under each `dockerfile: Dockerfile` of each `image` add once (depending on preference) `noCache: true`
```
- image: dockerUsername/expiration
  context: expiration
  docker:
    dockerfile: Dockerfile
    noCache: true
  sync:
    manual:
      - src: 'src/**/*.ts'
        dest: .
```

- Issue 7:
Image can't be pulled. Example:
```
- deployment/auth-depl: container auth is waiting to start: {{IMAGE_NAME}} can't be pulled
    - pod/auth-depl-654c594fd9-r2mpw: container auth is waiting to start: {{IMAGE_NAME}} can't be pulled
 - deployment/auth-depl failed. Error: container auth is waiting to start: {{IMAGE_NAME}} can't be pulled.
```

  - Fix 7:
    - update `skaffold.yaml``:
```
build:
  local:
    push: true
```
