type DeliveryOption = {
  id: string;
  name: string;
};

interface DropDownProps {
  content: {
    NAMES: readonly DeliveryOption[];
  };
  isOpen: boolean;
  setContent: (id: string) => void;
  handleDropBoxOpen: (flg: boolean) => void;
  value: string;
  placeholder: string;
}

const DropDown: React.FC<DropDownProps> = ({ content, isOpen, setContent, handleDropBoxOpen, value, placeholder }) => {
  const deliveryNames = [...content.NAMES];

  const renderCaretIcon = () => {
    const iconClass = isOpen ? 'fa-caret-up' : 'fa-caret-down';
    return (
      <i
        className={`absolute fa ${iconClass}`}
        style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
      ></i>
    );
  };

  const renderDropDownList = () => {
    if (!isOpen) return null;
    return (
      <ul className="absolute w-full left-0 mt-1 bg-white border border-black-300 rounded shadow-lg z-10">
        {deliveryNames.map(({ id, name }) => (
          <li
            key={id}
            className="block  px-4 py-2 cursor-pointer"
            style={{ zIndex: 200 }}
            onMouseDown={() => setContent(id)}
          >
            {name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          className="cursor-pointer border border-black-800 rounded-lg w-full p-2 placeholder-black-500 focus:outline-none focus:ring-2 focus:ring-[#F3A967] focus:border-white"
          placeholder={placeholder}
          readOnly
          onClick={() => handleDropBoxOpen(!isOpen)}
          onBlur={() => handleDropBoxOpen(false)}
          value={value}
        />
        {renderCaretIcon()}
      </div>
      <div className="relative w-full">{renderDropDownList()}</div>
    </div>
  );
};

export default DropDown;
