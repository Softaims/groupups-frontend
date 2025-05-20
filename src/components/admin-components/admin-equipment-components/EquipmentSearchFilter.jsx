import { Search, Filter } from "lucide-react";

const EquipmentSearchFilter = ({ searchQuery, onSearchChange, selectedIndustry, onIndustryChange, industries }) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="search"
        placeholder="Search equipment..."
        className="w-full rounded-md bg-[#0c0f12] pl-10 py-2 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white"
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
    <div className="relative min-w-[200px]">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <select
        className="w-full appearance-none rounded-md bg-[#0c0f12] pl-10 py-2 pr-8 border border-[#2a2e34] focus:outline-none focus:border-[#3CBFAE] text-white"
        value={selectedIndustry}
        onChange={onIndustryChange}
      >
        <option value="all">All Industries</option>
        {industries.map((industry) => (
          <option key={industry.id} value={industry.id}>
            {industry.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

export default EquipmentSearchFilter;
