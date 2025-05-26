const AdminPageHeader = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default AdminPageHeader; 