package com.qgbase.netty;

/**
 * @author : Winner
 * @name :
 * @date : 2019/5/15 0015
 * @desc :
 */
public class ByteConvertUtil {

    public static byte[] short2ByteNew(short x){
        byte high = (byte) (0x00FF & (x>>8));//定义第一个byte
        byte low = (byte) (0x00FF & x);//定义第二个byte
         byte[] bytes = new byte[2];
         bytes[0] = high;
         bytes[1] = low;
         return bytes;
    }

    public static short byte2shortNew(byte[] bytes){
        byte high = bytes[0];
        byte low = bytes[1];
        short z = (short)(((high & 0x00FF) << 8) | (0x00FF & low));
        return z;

    }

    public static short byteToShort_HL(byte[] b, int offset)
    {
        short result;
        result = (short)((((b[offset + 1]) << 8) & 0xff00 | b[offset] & 0x00ff));
        return result;
    }

    public static String bytesToHexString(byte[] src){
        StringBuilder stringBuilder = new StringBuilder("");
        if (src == null || src.length <= 0) {
            return null;
        }
        for (int i = 0; i < src.length; i++) {
            int v = src[i] & 0xFF;
            String hv = Integer.toHexString(v);
            if (hv.length() < 2) {
                stringBuilder.append(0);
            }
            stringBuilder.append(hv);
        }
        return stringBuilder.toString();
    }

    /**
     * 把16进制字符串转换成字节数组
     * @return byte[]
     */
    public static byte[] hexStringToByte(String hex) {
        int len = (hex.length() / 2);
        byte[] result = new byte[len];
        char[] achar = hex.toCharArray();
        for (int i = 0; i < len; i++) {
            int pos = i * 2;
            result[i] = (byte) (toByte(achar[pos]) << 4 | toByte(achar[pos + 1]));
        }
        return result;
    }

    private static int toByte(char c) {
        byte b = (byte) "0123456789ABCDEF".indexOf(c);
        return b;
    }
}
