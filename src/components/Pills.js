import React from "react";

export function Pills({ value, options, textColorClass, onSelect }) {
	return (
		<div className={`grid grid-cols-${options.length} gap-1`}>
			{options.map((optionValue, i) => {
				const id = `option-value-${optionValue}`;
				return (
					<div key={optionValue} className="flex flex-grow">
						<input
							id={id}
							type="radio"
							name="option-values"
							value={optionValue}
							hidden
							onChange={(e) => onSelect(e.target.value)}
							className="pill-input"
							checked={optionValue === value}
						></input>
						<label
							htmlFor={id}
							className={`${textColorClass} flex-grow rounded text-sm cursor-pointer text-center bg-white bg-opacity-50 py-3`}
						>
							{optionValue}
						</label>
					</div>
				);
			})}
		</div>
	);
}
