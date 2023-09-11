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

### Auth
<img width="901" alt="auth" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/ef5b8969-5fa3-4f82-8708-e5e8fd4b7a39">
<img width="1494" alt="auth process" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/6a8b48f4-597f-4074-864c-37915d69bea9">

## Events
<img width="867" alt="events" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/5e6a920e-c2bc-4d64-b3ef-7c998ee8038b">

## Notes about the overall design of each service
<img width="945" alt="overall-design-of-each-service" src="https://github.com/GenadiKozarev/ticketing-app/assets/84446009/28d6de4d-d1e0-4980-b61d-563383a0efa5">

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
    - run this command before `skaffold`
```
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
```


### commands
```
skaffold dev // start
```

- how to create kubectl secret for storing JTW information:
```
kubectl create secret generic {{NAME_OF_SECRET}} --from-literal={{KEY}}={{VALUE}}
```

- how to see all secrets:
```
kubectl get secrets
```