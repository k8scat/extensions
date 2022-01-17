import * as k8s from "@kubernetes/client-node";

export const searchPods = (namespace: string) => {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  k8sApi.listNamespacedPod(namespace).then((res) => {
    console.log(res.body);
  });
};
