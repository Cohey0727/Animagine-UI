import { useParams } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { useGenerateImageSubscription } from "../../graphql/generated";
import { Col } from "@/components";

// import { createWsClient } from "../../graphql/utils";

const AppId = () => {
  const params = useParams({ from: "/$id" });
  const [pause, setPause] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [{ data, fetching, ...res }] = useGenerateImageSubscription({
    variables: { input: { prompt } },
    pause,
  });

  console.log({ fetching, data, res });
  const handleChangePrompt = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    setPause(true);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (pause) {
      setPause(false);
    }
  }, [pause]);

  const imageUrl = useMemo(() => {
    if (!data) return null;
    const base = import.meta.env.VITE_API_URL!;
    return `${base}/${data.generateImage.filePath}`;
  }, [data]);

  return (
    <Col fullSize p={4} overflow="auto">
      <Col variant="concave" p={5}>
        {JSON.stringify(params)}
        <input onChange={handleChangePrompt} />
        <button onClick={handleGenerate}>生成</button>
        {imageUrl && <img src={imageUrl} alt="" />}
      </Col>
    </Col>
  );
};

export default AppId;
