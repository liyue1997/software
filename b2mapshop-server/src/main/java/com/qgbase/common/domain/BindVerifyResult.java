package com.qgbase.common.domain;


import com.qgbase.common.enumeration.EnumResultType;
import lombok.Getter;

/**
 * 验证结果
 *
 * @author cuiwei
 * @date 2018-5-5
 */
public class BindVerifyResult {
    @Getter
    private String code;
    @Getter
    private String msg;
    private boolean error;

    public static BindVerifyResultBuilder init() {
        return new BindVerifyResultBuilder();
    }

    public boolean hasError() {
        return error;
    }

    private BindVerifyResult() {
    }

    public static class BindVerifyResultBuilder {

        private BindVerifyResult bindVerifyResult;

        public BindVerifyResultBuilder() {
            bindVerifyResult = new BindVerifyResult();
        }

        public BindVerifyResultBuilder withMsgAndCode(EnumResultType resultType) {
            bindVerifyResult.code = resultType.getCode();
            bindVerifyResult.msg = resultType.getMsg();
            return this;
        }

        public BindVerifyResultBuilder withMsgAndCode(String code, String msg) {
            bindVerifyResult.code = code;
            bindVerifyResult.msg = msg;
            return this;
        }

        public BindVerifyResultBuilder withCode(String code) {
            bindVerifyResult.code = code;
            return this;
        }

        public BindVerifyResultBuilder withMsg(String msg) {
            bindVerifyResult.msg = msg;
            return this;
        }

        public BindVerifyResultBuilder verifySuccess() {
            bindVerifyResult.error = false;
            return this;
        }

        public BindVerifyResultBuilder verifyFiled() {
            bindVerifyResult.error = true;
            return this;
        }

        public BindVerifyResult build() {
            return bindVerifyResult;
        }

    }
}
