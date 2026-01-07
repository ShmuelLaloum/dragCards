import { Button, Result } from "antd";

interface ErrorStateProps {
  onRetry: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle="We couldn't load the products. Please check your connection and try again."
      extra={[
        <Button type="primary" key="retry" onClick={onRetry}>
          Try Again
        </Button>,
      ]}
    />
  );
}
