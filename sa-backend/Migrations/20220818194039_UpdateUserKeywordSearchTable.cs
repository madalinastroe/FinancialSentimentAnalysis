using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sentiment_analysis_be.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserKeywordSearchTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Article_Users_UserId",
                table: "Article");

            migrationBuilder.DropForeignKey(
                name: "FK_UserKeywordSearch_Users_UserId",
                table: "UserKeywordSearch");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserKeywordSearch",
                table: "UserKeywordSearch");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Article",
                table: "Article");

            migrationBuilder.RenameTable(
                name: "UserKeywordSearch",
                newName: "UserKeywordSearches");

            migrationBuilder.RenameTable(
                name: "Article",
                newName: "Articles");

            migrationBuilder.RenameIndex(
                name: "IX_UserKeywordSearch_UserId",
                table: "UserKeywordSearches",
                newName: "IX_UserKeywordSearches_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Article_UserId",
                table: "Articles",
                newName: "IX_Articles_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserKeywordSearches",
                table: "UserKeywordSearches",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Articles",
                table: "Articles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Users_UserId",
                table: "Articles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserKeywordSearches_Users_UserId",
                table: "UserKeywordSearches",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Users_UserId",
                table: "Articles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserKeywordSearches_Users_UserId",
                table: "UserKeywordSearches");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserKeywordSearches",
                table: "UserKeywordSearches");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Articles",
                table: "Articles");

            migrationBuilder.RenameTable(
                name: "UserKeywordSearches",
                newName: "UserKeywordSearch");

            migrationBuilder.RenameTable(
                name: "Articles",
                newName: "Article");

            migrationBuilder.RenameIndex(
                name: "IX_UserKeywordSearches_UserId",
                table: "UserKeywordSearch",
                newName: "IX_UserKeywordSearch_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Articles_UserId",
                table: "Article",
                newName: "IX_Article_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserKeywordSearch",
                table: "UserKeywordSearch",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Article",
                table: "Article",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Article_Users_UserId",
                table: "Article",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserKeywordSearch_Users_UserId",
                table: "UserKeywordSearch",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
