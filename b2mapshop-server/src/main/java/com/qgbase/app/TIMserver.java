package com.qgbase.app;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.Random;

/**
 * Created by pc on 2019/9/20.
 */
public class TIMserver {
    private static final String urlhead = "https://console.tim.qq.com/v4/";
    private static final long appid  = 1400259159;
    private static final String appkey  = "4e8a0794c453ba049efdffaba7c12bf94b61fe7a31c335d052ad1a45888edd15";
    private static final String user  = "admin";
    private static final String userkey=  "4e8a0794c453ba049efdffaba7c12bf94b61fe7a31c335d052ad1a45888edd15";
    static String getAppid(){
        return "sdkappid="+Long.toString(appid);
    }
    static String getAdminSign(){
        //administrator
        //4e8a0794c453ba049efdffaba7c12bf94b61fe7a31c335d052ad1a45888edd15
        return "&identifier="+user+"&usersig="+new TLSSigAPIv2(appid,appkey).genSig(user,180*86400);
    }
    static String getRadom(){
        Random r=new Random();
        return "&random="+Integer.toString(r.nextInt());
    }
    static String getGroupContenttype(String groupid,String groupname,String owerid,String faceurl){
        return "{\n" +
               // "  \"Owner_Account\":\""+owerid+"\"," + // 群主的 UserId（选填）
                "  \"Type\": \"Private\"," +  // 群组类型：Private/Public/ChatRoom/AVChatRoom/BChatRoom（必填）
                "  \"GroupId\": \""+groupid+"\", " +// 群id
                "  \"Name\": \""+groupname+"\", " +// 群名称（必填）
                "  \"Introduction\": \"拼团\", " +// 群简介（选填）
                "  \"Notification\": \"不得讨论政治、色情等话题\", " +// 群公告（选填）
                //"  \"FaceUrl\": \""+faceurl+"\", " +// 群头像 URL（选填）
                "  \"MaxMemberCount\": 500 " +// 最大群成员数量（选填）
                //"  \"ApplyJoinOption\": \"FreeAccess\" " + // 申请加群处理方式（选填）
                "}";
    }

    static String getGroupUserContenttype(String groupid,String userid){
        return "{\n" +
                "  \"GroupId\": \""+groupid+"\", " +// 要操作的群组（必填）
                "  \"Silence\": 1, " +// 是否静默加人（选填）
                "  \"MemberList\": [ " +// 一次最多添加500个成员
                "  {\n" +
                "      \"Member_Account\": \""+userid+"\"" + // 要添加的群成员 ID（必填）
                "  }\n" +
                "]}";
    }
    static String getUserContenttype(String userid,String username,String faceurl){
        return "{\n" +
                "   \"Identifier\":\""+userid+"\",\n" +
                "   \"Nick\":\""+username+"\",\n" +
                "   \"FaceUrl\":\""+faceurl+"\"\n" +
                "}";
    }

    public static String getUsersign(String userid){
        return new TLSSigAPIv2(appid,appkey).genSig(userid,180*86400);
    }
    public static void addUser(String userid,String username,String faceurl){
        //https://console.tim.qq.com/v4/im_open_login_svc/account_import?sdkappid=88888888&identifier=admin&usersig=xxx&random=99999999&contenttype=json
        String url=urlhead+"im_open_login_svc/account_import?"+getAppid()+getAdminSign()+getRadom()+"&contenttype=json";//
        //+getContenttype(groupid,groupname,owerid,faceurl);
        String content=getUserContenttype(userid,username,faceurl);
        System.out.println(url);
        System.out.println(content);
        doPost(url,content);
    }

    public static void addGroup(String groupid,String groupname,String owerid,String faceurl){
        //https://console.tim.qq.com/v4/group_open_http_svc/create_group?sdkappid=88888888&identifier=admin&usersig=xxx&random=99999999&contenttype=json
        String url=urlhead+"group_open_http_svc/create_group?"+getAppid()+getAdminSign()+getRadom()+"&contenttype=json";//
                //+getContenttype(groupid,groupname,owerid,faceurl);
        String content=getGroupContenttype(groupid,groupname,owerid,faceurl);
        System.out.println(url);
        System.out.println(content);
        doPost(url,content);

        addGroupUser(groupid,owerid);
    }

    public static void addGroupUser(String groupid,String userid){
        //https://console.tim.qq.com/v4/group_open_http_svc/add_group_member?sdkappid=88888888&identifier=admin&usersig=xxx&random=99999999&contenttype=json
        String url=urlhead+"group_open_http_svc/add_group_member?"+getAppid()+getAdminSign()+getRadom()+"&contenttype=json";//
        //+getContenttype(groupid,groupname,owerid,faceurl);
        String content=getGroupUserContenttype(groupid,userid);
        System.out.println(url);
        System.out.println(content);
        doPost(url,content);

    }


    //get方式：参数放置在url上
    public static String httpConn(String url1, String param ){
        String urlNameString = url1 + "?" + param;
        try{
            URL url = new URL(urlNameString);
            //打开url的连接

            URLConnection conn = url.openConnection();
            //设置连接属性
            conn.setConnectTimeout(6*1000);
            //获得输入流，并封装为字符
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));//获得网络返回的输入流
            String line;
            String result="";
            while ((line = in.readLine()) != null) {
                if (!"".equals(result) )
                    result += "/n";
                result+= line;
            }
            result=new String(result.getBytes(),"UTF-8");
            System.out.println("result"+result);
            return result;
        }catch(Exception e){
            e.printStackTrace();
            return "";
        }
        finally{

        }
    }

    //post方式，以输出流的形式发送
    public static void doPost(String url1, String param ){
        try{
            URL url = new URL(url1);
            //打开url的连接
            URLConnection conn = url.openConnection();
            //设置url的连接属性
            conn.setConnectTimeout(6*1000);
            conn.setDoOutput(true);    //设置OutPut是Ture
            //获得输出流，并将其封装为字符流
            PrintWriter out = new PrintWriter(conn.getOutputStream());
            //按字节的方式打印输出字符，并写入数组的某一部分
            out.print(param);
            //刷新输出流的缓冲
            out.flush();
            //获得网络返回的输入流，并封装为输入流
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));
            String line;
            String result=null;
            while ((line = in.readLine()) != null) {
                result += "/n" + line;
            }
            result=new String(result.getBytes(),"UTF-8");
            System.out.println("result"+result);
        }catch(Exception e){
            e.printStackTrace();
        }
        finally{

        }
    }
}
