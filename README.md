# Ticketing App

- Users can list a ticket for an event (concert, sports) for sale
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

### Events publishes by each Service
<img width="762" alt="events published by each serviceeee" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/b7365e8d-e8a1-4045-b7a9-6ddb55f5772d">

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

#### dependencies notes
- `ts-node-dev` - tool to execute the project in a development environment
- `mongodb-memory-server` - copy of mongodb will be running in-memory in order to test multiple databases at the same time, hence be able to run tests for different services concurrently on the same machine
- NATS Streaming Server - used to share events across all the different services in the app (commandline options ref: https://hub.docker.com/_/nats-streaming)


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
kubectl create secret generic {{NAME_OF_SECRET}} --from-literal={{KEY}}={{VALUE}}
// example: create a secret and after that try running `skaffold delete` and then `skaffold dev` again.
kubectl create secret generic jwt-secret --from-literal JWT_KEY=asdf
```

- kubectl commands:
```
kubectl get secrets
kubectl get namespace
kubectl get services -n ingress-nginx

// open a shell inside a pod
kubectl get pods
kubectl exec -it {{POD_NAME}} sh

// delete a pod
kubectl delete pod {{POD_NAME}}
```

- create TypeScript config file
```
tsc --init
```

- upon higher version of our library being available:
```
npm update @library-of-knowledge/common
```
