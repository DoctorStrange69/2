class Calculator:
    def add(number):
        print("Сложение")
        number_two = Calculator.get_input("Введите второе число:")
        result = number + number_two
        print("Результат:", result)

    def subtract(number):
        print("Вычитание")
        number_two = Calculator.get_input("Введите второе число:")
        result = number - number_two
        print("Результат:", result)

    def divide(number):
        print("Деление")
        number_two = Calculator.get_input("Введите второе число:")
        if number_two == 0:
            print("Ошибка: Деление на ноль.")
        else:
            result = number / number_two
            print("Результат:", result)

    def multiply(number):
        print("Умножение")
        number_two = Calculator.get_input("Введите второе число:")
        result = number * number_two
        print("Результат:", result)

    def power(number):
        print("Возведение в степень")
        number_two = Calculator.get_input("Введите степень:")
        result = number ** number_two
        print("Результат:", result)

    def get_input(prompt):
        while True:
            try:
                return int(input(prompt))
            except ValueError:
                print("Ошибка: Введите целое число.")

def main():
    number = Calculator.get_input("Введите первое число:")
    operation = input("Введите операцию (+, -, /, *, ^): ")
    
    if operation == "+":
        Calculator.add(number)
    elif operation == "-":
        Calculator.subtract(number)
    elif operation == "/":
        Calculator.divide(number)
    elif operation == "*":
        Calculator.multiply(number)
    elif operation == "^":
        Calculator.power(number)
    else:
        print("Некорректная операция. Завершение программ.")

if __name__ == "__main__":
    main()
