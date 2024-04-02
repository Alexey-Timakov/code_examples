import { cellAllColors, TCellColor, TCellSuperColor } from "entities/questMaker";
import { CSSProperties, ReactNode } from "react";
import styles from "./InputCell.module.scss";

interface IInputCell {
  inputSlot: ReactNode;
  diffColorSlot: ReactNode | null;
  superColorSlot: ReactNode | null;
  diffColor: TCellColor | null;
  superColor: TCellSuperColor | null;
  isActive: boolean;
  isError: boolean;
  z: number;
  onCellClick: () => void;
  isDeployed: boolean;
};

export const InputCell = ({ inputSlot, diffColorSlot, superColorSlot, isError, isActive, z, diffColor, superColor, onCellClick, isDeployed }: IInputCell) => {
  const sColor = superColor ? `RGB${cellAllColors[superColor]}` : null;
  const dColor = diffColor ? `RGB${cellAllColors[diffColor]}` : null;

  const bgStyle: CSSProperties = {
    "background": sColor && dColor
      ? `linear-gradient(135deg, ${sColor} 0 50%, ${dColor} 50% 100%)`
      : sColor && !dColor
        ? `linear-gradient(135deg, ${sColor} 0 50%, transparent 50% 100%)`
        : dColor
          ? dColor
          : "",
  };

  return (
    <div className={styles["cell-wrapper"]}
      style={{ zIndex: z }}
      onClick={onCellClick}
    >
      {isDeployed &&
        <div className={styles["deployed-indicator"]}></div>
      }
      <div className={styles["cell-inner"]} >
        <div style={bgStyle} className={`${styles.cell} ${isError ? styles.error : ""}  ${isActive ? styles.active : ""}`}>
          {inputSlot}
        </div>

        {diffColorSlot &&
          <div className={styles["color-selector"]}>
            {diffColorSlot}
          </div>
        }

        {superColorSlot &&
          <div className={styles["sup-color-selector"]}>
            {superColorSlot}
          </div>
        }
      </div>
    </div>
  )
};