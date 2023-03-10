// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using sentiment_analysis_be.Data;

#nullable disable

namespace sentiment_analysis_be.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20220827113315_RemoveUserGoalIdField")]
    partial class RemoveUserGoalIdField
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-preview.4.22229.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("ArticleKeyword", b =>
                {
                    b.Property<Guid>("ArticlesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("KeywordsName")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("ArticlesId", "KeywordsName");

                    b.HasIndex("KeywordsName");

                    b.ToTable("ArticleKeyword");
                });

            modelBuilder.Entity("sentiment_analysis_be.Data.Models.Article", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ArticleBrief")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ArticleContent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<double>("Negative")
                        .HasColumnType("float");

                    b.Property<double>("Neutral")
                        .HasColumnType("float");

                    b.Property<double>("Positive")
                        .HasColumnType("float");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("sentiment_analysis_be.Data.Models.Keyword", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Name");

                    b.ToTable("Keywords");
                });

            modelBuilder.Entity("sentiment_analysis_be.Data.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("sentiment_analysis_be.Data.Models.UserKeywordSearch", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("KeywordName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserKeywordSearches");
                });

            modelBuilder.Entity("ArticleKeyword", b =>
                {
                    b.HasOne("sentiment_analysis_be.Data.Models.Article", null)
                        .WithMany()
                        .HasForeignKey("ArticlesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("sentiment_analysis_be.Data.Models.Keyword", null)
                        .WithMany()
                        .HasForeignKey("KeywordsName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("sentiment_analysis_be.Data.Models.Article", b =>
                {
                    b.HasOne("sentiment_analysis_be.Data.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("sentiment_analysis_be.Data.Models.UserKeywordSearch", b =>
                {
                    b.HasOne("sentiment_analysis_be.Data.Models.User", null)
                        .WithMany("UserKeywordSearches")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("sentiment_analysis_be.Data.Models.User", b =>
                {
                    b.Navigation("UserKeywordSearches");
                });
#pragma warning restore 612, 618
        }
    }
}
