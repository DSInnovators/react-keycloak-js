package com.dsi.banbeis.response.base;

import java.io.Serializable;

/**
 current_page": 1,
 "next_page": null,
 "previous_page": null,
 "total_pages": 1,
 "per_page": 10,
 "total_entries": 5
 */
//https://medium.com/@bojanmajed/standard-json-api-response-format-c6c1aabcaa6d

public class Pagination implements Serializable {
    private Integer currentPage;
    private Integer nextPage;

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public Integer getNextPage() {
        return nextPage;
    }

    public void setNextPage(Integer nextPage) {
        this.nextPage = nextPage;
    }

    public Integer getPreviousPage() {
        return previousPage;
    }

    public void setPreviousPage(Integer previousPage) {
        this.previousPage = previousPage;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public Integer getPerPage() {
        return perPage;
    }

    public void setPerPage(Integer perPage) {
        this.perPage = perPage;
    }

    public Integer getTotalEntites() {
        return totalEntites;
    }

    public void setTotalEntites(Integer totalEntites) {
        this.totalEntites = totalEntites;
    }

    private Integer previousPage;
    private Integer totalPages;
    private Integer perPage;
    private Integer totalEntites;


}
