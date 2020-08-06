docker build -t jeffreyzhu/client:latest -t jeffreyzhu/client:$SHA -f ./client/Dockerfile ./client
docker build -t jeffreyzhu/server:latest -t jeffreyzhu/server:$SHA -f ./server/Dockerfile ./server
docker build -t jeffreyzhu/worker:latest -t jeffreyzhu/worker:$SHA -f ./worker/Dockerfile ./worker

docker push jeffreyzhu/client:latest
docker push jeffreyzhu/server
docker push jeffreyzhu/worker

docker push jeffreyzhu/client:$SHA
docker push jeffreyzhu/server:$SHA
docker push jeffreyzhu/worker:$SHA

kubectl apply -f k8s 
kubectl set image deployments/client-deployment client=jeffreyzhu/client:$SHA
kubectl set image deployments/server-deployment server=jeffreyzhu/server:$SHA
kubectl set image deployments/worker-deployment worker=jeffreyzhu/worker:$SHA
