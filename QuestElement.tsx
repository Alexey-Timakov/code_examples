import { H2QuestResponse } from "app/core/H2QQuestManager";
import { CostAndRewardBlock, CostAndRewardItems, CostAndRewardPrice, CostAndRewardTitle, getQuestPrice, getQuestReward, QuestMainBlock } from "entities/quest";
import { AddQuestToFav, FoldQuestBlock } from "features/quest";
import { BookmarkButtonsBlock, HeroesPlayBlock, QuestDescriptions, QuestItemPreview, QuestSelectedItem, QuestTitle, QuestTopInfo } from "entities/quest";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { delay } from "shared/lib";

interface IQuestElement {
  questData: H2QuestResponse;
  isAllQuestsFold?: boolean;
};

export const QuestElement: FC<PropsWithChildren<IQuestElement>> = ({ questData, isAllQuestsFold = false, children }) => {
  const [selectedItem, setSelectedItem] = useState<QuestSelectedItem | null>(null);
  const [isFold, setIsFold] = useState<boolean>(isAllQuestsFold);

  const costPrice = getQuestPrice(questData.m_questParams);
  const rewardPrice = getQuestReward(questData);

  const foldQuestBlock = async () => {
    setIsFold(prev => !prev);

    if (!isFold) {
      await delay(300);
      setSelectedItem(null);
    };
  };

  const clickOnItem = (item: QuestSelectedItem) => {
    if (isFold) {
      return;
    }

    if (JSON.stringify(item) === JSON.stringify(selectedItem)) {
      setSelectedItem(null);
    }
    else {
      setSelectedItem(item);
    }
  };

  useEffect(() => {
    setIsFold(isAllQuestsFold);
  }, [isAllQuestsFold]);

  return (
    <QuestMainBlock
      isFold={isFold}
      selectedItem={selectedItem}
      titleBlock={<QuestTitle questMParams={questData.m_questParams.mandatoryParams} />}
      bookmarkBlock={<BookmarkButtonsBlock
        addToFavBlock={<AddQuestToFav questId={questData.id} />}
        foldBlock={<FoldQuestBlock fold={foldQuestBlock} isFold={isFold} />}
      />}
      descriptionBlock={<QuestDescriptions description={questData.m_questParams.mandatoryParams.questNarrative} />}
      infoBlock={<QuestTopInfo questData={questData} />}
      previewBlock={<QuestItemPreview item={selectedItem} />}
      costBlock={<CostAndRewardBlock
        title={<CostAndRewardTitle type={"cost"} cost={costPrice} action={clickOnItem} />}
        items={<CostAndRewardItems cost={costPrice} type={"cost"} action={clickOnItem} selectedItem={selectedItem} />}
        price={<CostAndRewardPrice price={costPrice.qstAmount}
        />}
      />}
      rewardBlock={<CostAndRewardBlock
        title={<CostAndRewardTitle type={"reward"} cost={rewardPrice} action={clickOnItem} />}
        items={<CostAndRewardItems cost={rewardPrice} type={"reward"} action={clickOnItem} selectedItem={selectedItem} />}
        price={<CostAndRewardPrice price={rewardPrice.maxParticipants
          ? Math.floor(rewardPrice.qstAmount / rewardPrice.maxParticipants)
          : Math.floor(rewardPrice.qstAmount)
        }
        />}
      />}
      heroPlayBlock={<HeroesPlayBlock questData={questData} />}
      btnBlock={children}
    />
  )
};