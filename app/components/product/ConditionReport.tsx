import { RefreshCw, Ruler, Info } from "lucide-react";

interface ConditionReportProps {
  status: string;
  dimensions: string;
  description: string;
}

const ConditionReport = ({
  status,
  dimensions,
  description,
}: ConditionReportProps) => {
  return (
    <div className="bg-[#EAE6D8]/40 p-8 mt-10 mb-8 border border-black/5">
      <div className="flex items-center gap-2 mb-6 text-brown">
        <RefreshCw size={18} />
        <h3 className="font-heading text-xl text-black">Raport stanu</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-6">
        {/* Status */}
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gray block mb-1">
            Status
          </span>
          <p className="font-body text-sm font-semibold text-black">{status}</p>
        </div>

        {/* Wymiary */}
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gray block mb-1 flex items-center gap-1">
            <Ruler size={12} /> Wymiary
          </span>
          <p className="font-body text-sm font-semibold text-black">
            {dimensions}
          </p>
        </div>
      </div>

      {/* Opis Stanu */}
      <div>
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gray block mb-2">
          Opis stanu
        </span>
        <p className="font-body text-m text-black/70 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ConditionReport;
