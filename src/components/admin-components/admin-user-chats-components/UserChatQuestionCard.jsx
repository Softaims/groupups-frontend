import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, CheckSquare, Upload } from "lucide-react";

const UserChatQuestionCard = ({
  question,
  isExpanded,
  onToggleExpand,
}) => {
  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case "open_ended":
        return <FileText className="h-4 w-4 text-blue-400" />;
      case "multiple_choice":
        return <CheckSquare className="h-4 w-4 text-green-400" />;
      case "statement":
        return <FileText className="h-4 w-4 text-yellow-400" />;
      case "file_upload":
        return <Upload className="h-4 w-4 text-purple-400" />;
      case "textarea": // Assuming textarea is similar to open_ended
        return <FileText className="h-4 w-4 text-blue-400" />;
      case "number": // Assuming number is similar to open_ended
        return <FileText className="h-4 w-4 text-blue-400" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case "open_ended":
        return "Open-ended";
      case "multiple_choice":
        return "Multiple Choice";
      case "statement":
        return "Statement";
      case "file_upload":
        return "File Upload";
      case "textarea":
        return "Textarea";
      case "number":
        return "Number";
      default:
        return "Unknown";
    }
  };

  const renderAnswer = (question) => {
    switch (question.type) {
      case "file_upload":
        return (
          <a href={question.answer} target="_blank" rel="noopener noreferrer" className="text-[#3CBFAE] hover:underline">
            {question.answer.split('/').pop()} {/* Display file name */}
          </a>
        );
      case "multiple_choice":
        // Assuming answer for multiple choice is the selected option text(s)
        const selectedOptions = Array.isArray(question.answer) ? question.answer : [question.answer];
        return (
          <div className="flex flex-wrap gap-2 mt-2">
            {question.options.map((option, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${selectedOptions.includes(option)
                    ? "bg-[#3CBFAE] text-white"
                    : "bg-[#2a2e34] text-gray-300"}`}
              >
                {option}
              </span>
            ))}
          </div>
        );
      case "statement":
        return <p className="text-gray-300 text-sm whitespace-pre-wrap">{question.answer}</p>;
      case "open_ended":
      case "textarea":
      case "number":
      default:
        return <p className="text-gray-300 text-sm whitespace-pre-wrap">{question.answer}</p>;
    }
  };

  return (
    <div
      className="p-4 bg-[#0c0f12] rounded-lg border border-[#2a2e34] transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between" onClick={onToggleExpand}>
         <div className="flex items-center gap-2">
          {getQuestionTypeIcon(question.type)}
          <h3 className="text-white font-medium">{question.question}</h3>
           <div className="flex items-center gap-1 bg-[#1a1e24] px-2 py-1 rounded text-xs">
            <span className="text-gray-300">{getQuestionTypeLabel(question.type)}</span>
           </div>
           {question.required && <span className="bg-red-900/30 text-red-400 text-xs px-2 py-0.5 rounded">Required</span>}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-[#2a2e34]">
           <div className="flex items-start gap-2 mb-2">
             <span className="text-gray-400 text-sm flex-shrink-0">Answer:</span>
             {renderAnswer(question)}
           </div>
        </div>
      )}
    </div>
  );
};

export default UserChatQuestionCard; 