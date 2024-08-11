const Feature = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center">
        <img src="/feature.png" width={200} height={200} />
        <p>
          This <b>{title}</b> feature will be added in future updates.
        </p>
      </div>
    </div>
  );
};

export default Feature;
