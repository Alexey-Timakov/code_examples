import { ModalButtons, ModalCancelButton, ModalPrice, ModalText, ModalTextLowBalance, ModalTitle, ModalTypes, ModalWrapperChildren, ModalWrapperOut } from "entities/generator";
import { useContext } from "react";
import { H2QContext } from "app/core/H2QContext";

interface IAcceptCharacter {
  accept: () => void;
  reject: () => void;
}

const type: ModalTypes = "acceptChar";

export const AcceptCharacter = ({ accept, reject }: IAcceptCharacter) => {
  const { h2qAccount } = useContext(H2QContext);

  const price = h2qAccount.data.m_acceptPrice
    ? Number(h2qAccount.data.m_acceptPrice) + Number(h2qAccount.data.m_generatedHero?.metaCharacter.valPrice || 0)
    : null;

  return (
    <>
      <ModalWrapperOut>
        <ModalTitle type={type} />

        <ModalWrapperChildren>
          {price && (
            <>
              {h2qAccount.data.m_h2qBalance && +h2qAccount.data.m_h2qBalance >= price
                ? <ModalText type={type} />
                : <ModalTextLowBalance />
              }
              <ModalPrice price={price} />
              {h2qAccount.data.m_h2qBalance && +h2qAccount.data.m_h2qBalance >= price
                ? <ModalButtons type={type} accept={accept} reject={reject} />
                : <ModalCancelButton type={type} reject={reject} />
              }
            </>
          )}
        </ModalWrapperChildren>

      </ModalWrapperOut>
    </>
  );
};