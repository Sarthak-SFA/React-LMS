
declare namespace Master {


  interface BookForm {
    bookName: string;
    authorName: string;
    publisherName: string;
    bookPrice: number;
    categoryId: number;
  }

  interface BookItem extends BookForm {
    id: number;
  }

  interface CategoryForm {
    categoryType: string;
  }

  interface CategoryItem extends CategoryForm {
    id: number;
  }

  interface MemberForm {
    memberName: string;
    memberType: string;
  }

  interface MemberItem extends MemberForm {
    id: number;
  }

  interface IssueForm {
    bookId: number;
    memberId: number;
    issueDate?: string;        
    returnDate?: string;       
    }

  interface IssueItem extends IssueForm {
    id: number;
    renewDate?: string;
    renewReturnDate?: string;
  }

}