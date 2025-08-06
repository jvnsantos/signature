import { spillCode } from "@/shared/utils/spill-totpcode.utils";
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

interface TotpRequireProps {
  onCodeComplete: (code: string) => void;
  onClear?: () => void;
  loading?: boolean;
  width: '25' | '50' | '75' | '100'
}

const MfaComponent = forwardRef((props: TotpRequireProps, ref) => {
  const { onCodeComplete, onClear, width, loading } = props;

  const inputRefs: any = {
    one: useRef(null),
    two: useRef(null),
    three: useRef(null),
    four: useRef(null),
    five: useRef(null),
    six: useRef(null),
  };

  const handleInputChange = useCallback(
    (currentId: string, nextId: string) => {
      const currentInput = inputRefs[currentId].current;
      const nextInput = inputRefs[nextId]?.current;

      if (currentInput?.value.length === 1 && nextInput) {
        nextInput.focus();
      }

      const code = spillCode(inputRefs).trim();
      if (code.length === 6) {
        onCodeComplete(code);
      }
    },
    [inputRefs, onCodeComplete]
  );

  const handleBackspace = useCallback(
    (currentId: string, prevId: string, event: React.KeyboardEvent) => {
      const currentInput = inputRefs[currentId].current;
      if (event.key === "Backspace" && currentInput?.value === "") {
        const prevInput = inputRefs[prevId]?.current;
        if (prevInput) {
          prevInput.focus();
        }
      }
    },
    [inputRefs]
  );

  const clearInputs = useCallback(() => {
    Object.values(inputRefs).forEach((ref: any) => {
      if (ref.current) {
        ref.current.value = "";
      }
    });
    if (onClear) {
      onClear();
    }
  }, [inputRefs, onClear]);


  useImperativeHandle(ref, () => ({
    clearInputs,
  }));



  return (
    <div className={`row gy-3 py-2 w-${width}`}>
      <Col xl={12} className="mb-2">
        <Form.Label className="text-default">Token de acesso
          <OverlayTrigger placement="right" overlay={
            <Tooltip className="tooltip-light right">Insira o código gerado pelo aplicativo autenticador configurado. </Tooltip>}>
            <i className="bi bi-info-circle-fill ms-2"></i>
          </OverlayTrigger></Form.Label>
        <Row>
          {["one", "two", "three", "four", "five", "six"].map(
            (id, index, arr) => (
              <div className="col-2" key={id}>
                <Form.Control
                  disabled={loading}
                  type="text"
                  className="form-control-lg text-center p-0 shadow-light"
                  id={id}
                  maxLength={1}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("Text").trim();
                    if (/^\d{6}$/.test(pasted)) {
                      e.preventDefault();
                      const keys = ["one", "two", "three", "four", "five", "six"];
                      for (let i = 0; i < 6; i++) {
                        const ref = inputRefs[keys[i]];
                        if (ref?.current) {
                          ref.current.value = pasted.charAt(i);
                        }
                      }
                      onCodeComplete(pasted);
                    }
                  }}
                  onChange={() =>
                    handleInputChange(
                      id,
                      arr[index + 1] || "nextInputId"
                    )
                  }
                  onKeyDown={(e) =>
                    handleBackspace(
                      id,
                      arr[index - 1] || "prevInputId",
                      e
                    )
                  }
                  ref={inputRefs[id]}
                />
              </div>
            )
          )}
        </Row>
      </Col>
    </div>

  );
});

export default MfaComponent;
