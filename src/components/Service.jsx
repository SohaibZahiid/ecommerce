function Service({ icon, title, desc }) {
  return (
    <div className="flex-1 min-w-[150px] p-2">
      {icon}
      <h2 className="font-bold mb-1">{title}</h2>
      <p className="text-sm">{desc}</p>
    </div>
  );
}

export default Service;
