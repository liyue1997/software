package com.qgbase.util;

import java.util.List;

/**
 * 分页通用类
 */
public class PageControl {
    private int cpage = 1;
    private int totalitem;
    private String sumtotal;
    private int totalpage;
    private int pagesize = 10;
    @SuppressWarnings("unused")
    private int nextpage;
    @SuppressWarnings("unused")
    private int previouspage;
    @SuppressWarnings("unused")
    private boolean hasnextpage;
    @SuppressWarnings("unused")
    private boolean hasprevioupage;
    private boolean hasfristpage;
    private boolean hasendpage;
    private Long oprDate;
    @SuppressWarnings("unchecked")
    private List list;

    public boolean isHasendpage() {
        return this.hasendpage;
    }

    public void setHasendpage(boolean hasendpage) {
        this.hasendpage = hasendpage;
    }

    public boolean isHasfristpage() {
        return this.hasfristpage;
    }

    public void setHasfristpage(boolean hasfristpage) {
        this.hasfristpage = hasfristpage;
    }

    public boolean isHasnextpage() {
        return (this.cpage < this.totalpage);
    }

    public void setHasnextpage(boolean hasnextpage) {
        this.hasnextpage = hasnextpage;
    }

    public boolean isHasprevioupage() {
        return (this.cpage != 1);
    }

    public void setHasprevioupage(boolean hasprevioupage) {
        this.hasprevioupage = hasprevioupage;
    }

    public int getPagesize() {
        return this.pagesize;
    }

    public void setPagesize(int pagesize) {
        this.pagesize = pagesize;
    }


    public String getSumtotal() {
        return this.sumtotal;
    }

    public void setSumtotal(String sumtotal) {
        this.sumtotal = sumtotal;
    }


    public int getCpage() {
        return this.cpage;
    }

    public void setCpage(int cpage) {
        this.cpage = cpage;
    }

    @SuppressWarnings("unchecked")
    public List getList() {
        return this.list;
    }

    @SuppressWarnings("unchecked")
    public void setList(List list) {
        this.list = list;
    }

    public int getNextpage() {
        if (isHasnextpage()) {
            return (this.cpage + 1);
        }
        return this.cpage;
    }

    public void setNextpage(int nextpage) {
        this.nextpage = nextpage;
    }

    public int getPreviouspage() {
        if (isHasprevioupage()) {
            return (this.cpage - 1);
        }
        return this.cpage;
    }

    public void setPreviouspage(int previouspage) {
        this.previouspage = previouspage;
    }

    public int getTotalitem() {
        return this.totalitem;
    }

    public void setTotalitem(int totalitem) {
        this.totalitem = totalitem;
        if (this.pagesize <= 0)
            return;
        this.totalpage = ((totalitem % this.pagesize > 0) ? totalitem / this.pagesize + 1 : totalitem / this.pagesize);
    }

    public Long getOprDate() {
        return oprDate;
    }

    public void setOprDate(Long oprDate) {
        this.oprDate = oprDate;
    }

    public int getTotalpage() {
        return this.totalpage;
    }

    public void setTotalpage(int totalpage) {
        this.totalpage = totalpage;
    }
}
