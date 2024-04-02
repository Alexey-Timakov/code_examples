import { H2QContext } from "app/core/H2QContext";
import { TInputSquare } from "entities/questMaker";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import styles from "./EditSeason.module.scss";

interface IEditSeason {
  season: TInputSquare
};

export const EditSeason = observer(function ({ season }: IEditSeason) {
  const { h2qAccount } = useContext(H2QContext);
  const [seasonMainParams, setSeasonMainParams] = useState<{
    seasonTitle: string;
    seasonDescr: string;
  }>(() => { return { seasonTitle: season.seasonTitle, seasonDescr: season.seasonDescr } });

  return (
    <>
      <h2 className={styles["season-header"]}>Edit season main params:</h2>
      <div className={`${styles["season-title"]} ${h2qAccount.uiStore.rightSidebarChild.editable ? styles.editable : ""}`}>
        <input
          type="text"
          value={seasonMainParams.seasonTitle}
          disabled={!h2qAccount.uiStore.rightSidebarChild.editable}
          placeholder="Enter Season Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeasonMainParams(prev => { return { ...prev, seasonTitle: e.target.value } })}
        />
      </div>

      <div className={`${styles["season-descr"]} ${h2qAccount.uiStore.rightSidebarChild.editable ? styles.editable : ""}`}>
        <textarea
          value={seasonMainParams.seasonDescr}
          disabled={!h2qAccount.uiStore.rightSidebarChild.editable}
          placeholder="Enter Season Description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSeasonMainParams(prev => { return { ...prev, seasonDescr: e.target.value } })}
        />
      </div>
    </>
  )
});