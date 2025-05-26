const EquipmentButton = ({ equipment, selectedEquipment, setSelectedEquipment }) => {
  return (
    <button
      onClick={() => setSelectedEquipment(equipment)}
      className={`${
        selectedEquipment?.id === equipment?.id
          ? "bg-black border border-[#4aa6a4]"
          : "border border-[#187775]/30 hover:border-[#4aa6a4] transition-colors"
      } cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-6 `}
    >
      <span className="text-white">{equipment?.name}</span>
    </button>
  );
};

export default EquipmentButton;
