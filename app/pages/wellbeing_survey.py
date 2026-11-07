def wellbeing_survey():
    print("\n--- Mental Well-Being Survey ---")
    print("How would you describe your overall mental well-being today?\n")
    print("1. 😊 Good")
    print("2. 😐 Okay")
    print("3. ☹️ Not good")

    answer = input("\nSelect 1, 2, or 3 (or press Enter to skip): ").strip()

    if answer == "1":
        print("Thank you for sharing! 😊")
    elif answer == "2":
        print("Thank you for sharing! 😐")
    elif answer == "3":
        print("Thank you for sharing! ☹️")
    elif answer == "":
        print("Survey skipped.")
    else:
        print("Invalid selection. Please run the survey again and choose 1, 2, or 3.")


if __name__ == "__main__":
    wellbeing_survey()
